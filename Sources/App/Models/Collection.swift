import Fluent
import Vapor

final class Collection: Model, Content {
    static let schema: String = "collection"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Siblings(through: MockedResponseCollection.self, from: \.$collection, to: \.$mockedResponse)
    var mockedResponses: [MockedResponse]
    
    init() {}

    init(id: UUID? = nil, name: String) {
        self.id = id
        self.name = name
    }
}
