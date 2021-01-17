import Fluent
import Vapor

struct MockedResponseController {
    func index(req: Request) throws -> EventLoopFuture<[MockedResponse.Get]> {
        return MockedResponse.query(on: req.db).with(\.$user).sort(\.$createdAt, .descending).all().flatMapThrowing { mockedResponses in
            mockedResponses.map { mockedResponse in
                MockedResponse.Get(mockedResponse: mockedResponse)
            }
        }
    }

    func create(req: Request) throws -> EventLoopFuture<MockedResponse.Get> {
        let createRequest = try req.content.decode(MockedResponse.Create.self)
        let response = MockedResponse(
            path: createRequest.path,
            content: createRequest.content,
            description: createRequest.description,
            userId: try req.auth.require(User.self).id
        )
        return response.save(on: req.db).map { MockedResponse.Get(mockedResponse: response) }
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        guard let id = req.parameters.get("id", as: UUID.self) else {
            throw Abort(.badRequest)
        }
        return MockedResponse.find(id, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
     }
    
    func update(req: Request) throws -> EventLoopFuture<MockedResponse.Get> {
        guard let id = req.parameters.get("id", as: UUID.self) else {
            throw Abort(.badRequest)
        }
        let mockedResponseRequest = try req.content.decode(MockedResponse.Update.self)
        return MockedResponse.find(id, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { mockedResponse in
                mockedResponse.path = mockedResponseRequest.path
                mockedResponse.content = mockedResponseRequest.content
                mockedResponse.isActive = mockedResponseRequest.isActive
                mockedResponse.replaceDates = mockedResponseRequest.replaceDates
                if mockedResponseRequest.description != nil {
                    mockedResponse.description = mockedResponseRequest.description
                }
                return mockedResponse.update(on: req.db).flatMap {
                    MockedResponse.query(on: req.db)
                        .filter(\.$id == id)
                        .with(\.$user)
                        .first()
                        .unwrap(or: Abort(.notFound))
                        .map { MockedResponse.Get(mockedResponse: $0) }
                }
            }
    }
    
    func updateCollection(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        let mockedResponse = MockedResponse.find(req.parameters.get("responseID"), on: req.db)
            .unwrap(or: Abort(.notFound))
        let collection = Collection.find(req.parameters.get("collectionID"), on: req.db)
            .unwrap(or: Abort(.notFound))
        return mockedResponse.and(collection).flatMap { (mockedResponse, collection) in
            mockedResponse.$collections.attach(collection, on: req.db)
        }.transform(to: .ok)
    }
}
