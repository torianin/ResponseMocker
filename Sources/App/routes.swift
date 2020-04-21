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
    app.get("*", "*", "*", "*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", "*", "*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", "*", "*", "*", "*", use: getMockedResponseWithPath)
    app.get("*", "*", "*", "*", "*", "*", "*", "*", use: getMockedResponseWithPath)

    let responseController = MockedResponseController()
    app.get("responses", use: responseController.index)
    app.post("responses", use: responseController.create)
}

func getMockedResponseWithPath(req: Request) throws -> EventLoopFuture<String> {
    req.logger.info("\(req.url.string)")
    return MockedResponse.query(on: req.db)
        .all()
        .map({ mockedResponses -> MockedResponse? in
            let filteredMockedResponses = mockedResponses.filter { mockedResponse -> Bool in
                let predicate = NSPredicate(format: "self LIKE %@", mockedResponse.path)
                return !NSArray(object: req.url.string).filtered(using: predicate).isEmpty
            }
            return filteredMockedResponses.first
        })
        .unwrap(or: Abort(.notFound))
        .map { $0.content }
}
