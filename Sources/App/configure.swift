import Fluent
import FluentSQLiteDriver
import Vapor
import Leaf

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.viewsDirectory))

    app.middleware.use(CORSMiddleware(configuration: .default()))

    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    app.migrations.add(CreateMockedResponse())

    app.views.use(.leaf)
    app.leaf.cache.isEnabled = false

    // register routes
    try routes(app)
}
