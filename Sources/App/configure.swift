import Fluent
import FluentSQLiteDriver
import Vapor
import Leaf

// configures your application
public func configure(_ app: Application) throws {

    let fileMiddleware = FileMiddleware(publicDirectory: app.directory.viewsDirectory)
    
    let corsMiddleware = CORSMiddleware(configuration: .init(
        allowedOrigin: .all,
        allowedMethods: [.GET, .POST, .PUT, .OPTIONS, .DELETE, .PATCH],
        allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith, .userAgent, .accessControlAllowOrigin]
    ))
    
    let errorMiddleware = ErrorMiddleware.default(environment: app.environment)

    app.middleware = .init()
    app.middleware.use(corsMiddleware)
    app.middleware.use(errorMiddleware)
    app.middleware.use(fileMiddleware)
    
    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    setupMigrations(app)

    app.views.use(.leaf)
    app.leaf.cache.isEnabled = false

    try routes(app)
    app.routes.defaultMaxBodySize = "500kb"

    setupHostnameAndPort(app)
    try setupTlsConfiguration(app)
}

private func setupMigrations(_ app: Application) {
    app.migrations.add(CreateMockedResponse())
    app.migrations.add(CreateUser())
    app.migrations.add(SeedUser())
    app.migrations.add(CreateUserToken())
    app.migrations.add(CreateCollection())
    app.migrations.add(CreateMockedResponseCollection())
}

private func setupHostnameAndPort(_ app: Application) {
    guard let hostname = Environment.get("HOSTNAME"),
        let port = Int(Environment.get("PORT") ?? "") else { return }
    
    app.http.server.configuration.hostname = hostname
    app.http.server.configuration.port = port
}

private func setupTlsConfiguration(_ app: Application) throws {
    guard let certPath = Environment.get("CERT_PATH"),
        let intermediateCertPath = Environment.get("INTERMEDIATE_CERT_PATH"),
        let keyPath = Environment.get("KEY_PATH") else { return }
    
    try app.http.server.configuration.tlsConfiguration = .forServer(
        certificateChain: [
            .certificate(.init(
                file: certPath,
                format: .pem
            )),
            .certificate(.init(
                file: intermediateCertPath,
                format: .pem
            ))
        ],
        privateKey: .file(keyPath)
    )
}
