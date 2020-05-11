import Fluent
import Vapor

struct SeedUser: Fluent.Migration {

    func prepare(on database: Database) -> EventLoopFuture<Void> {
        let directory = DirectoryConfiguration.detect()
        let configDir = "Sources/App/Seeds"

        if let jsonData = try? Data(contentsOf: URL(fileURLWithPath: directory.workingDirectory)
                .appendingPathComponent(configDir, isDirectory: true)
            .appendingPathComponent("User.json", isDirectory: false)),
            let create = try? JSONDecoder().decode(User.Create.self, from: jsonData) {
//
//          Segmentation fault bug
//          https://bugs.swift.org/browse/SR-12424
//
//          let user = try? User(
//              name: create.name,
//              passwordHash: Bcrypt.hash(create.password)
//          ) {
//
            let user = User(
                name: create.name,
                passwordHash: create.password
            )
            return user.save(on: database)
        }
        return database.eventLoop.makeSucceededFuture(())
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.eventLoop.makeSucceededFuture(())
    }
}

