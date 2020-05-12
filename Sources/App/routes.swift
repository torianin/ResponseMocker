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
    tokenProtected.delete("responses", ":id", use: responseController.delete)
        
    tokenProtected.get("config") { req -> String in
        let user = try req.auth.require(User.self)
        return user.name
    }
}

func getMockedResponseWithPath(req: Request) throws -> EventLoopFuture<String> {
    req.logger.info("\(req.url.string)")
    return MockedResponse.query(on: req.db)
        .all()
        .map({ mockedResponses -> MockedResponse? in
            let filteredMockedResponses = mockedResponses.filter { mockedResponse -> Bool in
                return req.url.string.matches(path: mockedResponse.path)
            }
            return filteredMockedResponses.first
        })
        .unwrap(or: Abort(.notFound))
        .map { $0.content }
}
