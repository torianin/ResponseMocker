import Fluent
import Vapor

func routes(_ app: Application) throws {
    app.get("*", use: getMockedResponseWithPath)
    app.get("*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", "*", use: getMockedResponseWithPath)

    let responseController = MockedResponseController()
    app.get("responses", use: responseController.index)
    app.post("responses", use: responseController.create)
}

func getMockedResponseWithPath(req: Request) throws -> EventLoopFuture<MockedResponse> {
    req.logger.info("\(req.url.string)")
    return MockedResponse.query(on: req.db)
        .filter(\.$path ~~ req.url.string)
        .first()
        .unwrap(or: Abort(.notFound))
}
