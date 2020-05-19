import Fluent
import Vapor

struct CollectionController {
    func index(req: Request) throws -> EventLoopFuture<[Collection]> {
        return Collection.query(on: req.db).all()
    }

    func create(req: Request) throws -> EventLoopFuture<Collection> {
        let collection = try req.content.decode(Collection.self)
        return collection.save(on: req.db).map { collection }
    }
}
