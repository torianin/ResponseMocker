import Fluent
import Vapor

struct MockedResponseController {
    func index(req: Request) throws -> EventLoopFuture<[MockedResponse]> {
        return MockedResponse.query(on: req.db).sort(\.$createdAt, .descending).all()
    }

    func create(req: Request) throws -> EventLoopFuture<MockedResponse> {
        let response = try req.content.decode(MockedResponse.self)
        return response.save(on: req.db).map { response }
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
}
