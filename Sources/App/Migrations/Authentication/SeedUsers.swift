import Fluent
import Vapor

struct SeedUsers: Fluent.Migration {

    func prepare(on database: Database) -> EventLoopFuture<Void> {
        for userSeed in users {
            let user = try? User(
                name: userSeed.name,
                passwordHash: Bcrypt.hash(userSeed.password)
            )
            guard let unwappedUser = user else { continue }
            return unwappedUser.save(on: database)
        }
        return database.eventLoop.makeSucceededFuture(())
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.eventLoop.makeSucceededFuture(())
    }
}
