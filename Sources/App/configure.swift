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

    setupHostnameAndPort(app)
    try setupTlsConfiguration(app)
}

private func setupHostnameAndPort(_ app: Application) {
    guard let hostname = Environment.get("HOSTNAME"),
        let port = Int(Environment.get("PORT") ?? "") else { return }
    
    app.server.configuration.hostname = hostname
    app.server.configuration.port = port
}

private func setupTlsConfiguration(_ app: Application) throws {
    guard let certPath = Environment.get("CERT_PATH"),
        let keyPath = Environment.get("KEY_PATH") else { return }
    
    try app.server.configuration.tlsConfiguration = .forServer(
        certificateChain: [
            .certificate(.init(
                file: certPath,
                format: .pem
            ))
        ],
        privateKey: .file(keyPath)
    )
}
