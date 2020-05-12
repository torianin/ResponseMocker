import Fluent
import FluentSQLiteDriver
import Vapor
import Leaf

// configures your application
public func configure(_ app: Application) throws {

    app.middleware.use(FileMiddleware(publicDirectory: app.directory.viewsDirectory))
    app.middleware.use(CORSMiddleware(configuration: .default()))

    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    setupMigrations(app)

    app.views.use(.leaf)
    app.leaf.cache.isEnabled = false

    try routes(app)

    setupHostnameAndPort(app)
    try setupTlsConfiguration(app)
}

private func setupMigrations(_ app: Application) {
    app.migrations.add(CreateMockedResponse())
    app.migrations.add(CreateUser())
    app.migrations.add(SeedUser())
    app.migrations.add(CreateUserToken())
}

private func setupHostnameAndPort(_ app: Application) {
    guard let hostname = Environment.get("HOSTNAME"),
        let port = Int(Environment.get("PORT") ?? "") else { return }
    
    app.http.server.configuration.hostname = hostname
    app.http.server.configuration.port = port
}

private func setupTlsConfiguration(_ app: Application) throws {
    guard let certPath = Environment.get("CERT_PATH"),
        let keyPath = Environment.get("KEY_PATH") else { return }
    
    try app.http.server.configuration.tlsConfiguration = .forServer(
        certificateChain: [
            .certificate(.init(
                file: certPath,
                format: .pem
            ))
        ],
        privateKey: .file(keyPath)
    )
}
