import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    app.get { req in
        req.view.render("index")
    }

    app.get("*", use: getMockedResponseWithPath)
    app.get("*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", "*", use: getMockedResponseWithPath)

    let responseController = MockedResponseController()
    app.get("responses", use: responseController.index)
    app.post("responses", use: responseController.create)
}

func getMockedResponseWithPath(req: Request) throws -> EventLoopFuture<String> {
    req.logger.info("\(req.url.string)")
    return MockedResponse.query(on: req.db)
        .filter(\.$path ~~ req.url.string)
        .first()
        .unwrap(or: Abort(.notFound))
        .map { $0.content }
}
