import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    app.get { req in
        req.view.render("index")
    }

    let passwordProtected = app.grouped(User.authenticator())
    passwordProtected.post("login") { req -> EventLoopFuture<UserToken> in
        let user = try req.auth.require(User.self)
        let token = try user.generateToken()
           return token.save(on: req.db)
               .map { token }
    }
    
    let tokenProtected = app.grouped(UserToken.authenticator())
                            .grouped(User.guardMiddleware())

    tokenProtected.get("**", use: getMockedResponseWithPath)
    
    let responseController = MockedResponseController()
    tokenProtected.get("responses", use: responseController.index)
    tokenProtected.post("responses", use: responseController.create)
    tokenProtected.put("responses", ":id", use: responseController.update)
    tokenProtected.post("response", ":responseID", "collection", ":collectionID", use: responseController.updateCollection)
    tokenProtected.delete("responses", ":id", use: responseController.delete)

    let collectionController = CollectionController()
    tokenProtected.get("collections", use: collectionController.index)
    tokenProtected.post("collections", use: collectionController.create)
    
    tokenProtected.get("config") { req -> String in
        let user = try req.auth.require(User.self)
        return user.name
    }
}

func getMockedResponseWithPath(req: Request) throws -> EventLoopFuture<String> {
    let dateRenderer = DateRenderer()
    req.logger.info("\(req.url.string)")
    return MockedResponse.query(on: req.db)
        .all()
        .map({ mockedResponses -> MockedResponse? in
            let filteredMockedResponses = mockedResponses.filter { mockedResponse -> Bool in
                return req.url.string.matches(path: mockedResponse.path) && mockedResponse.isActive
            }
            return filteredMockedResponses.first
        })
        .unwrap(or: Abort(.notFound))
        .map {
            if $0.replaceDates {
                return dateRenderer.render(content: $0.content)
            } else {
                return $0.content
            }
        }
}
