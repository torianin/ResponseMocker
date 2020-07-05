import Fluent
import Vapor

final class MockedResponse: Model, Content {
    static let schema = "responses"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "path")
    var path: String

    @Field(key: "content")
    var content: String

    @Field(key: "is_active")
    var isActive: Bool
    
    @Field(key: "replace_dates")
    var replaceDates: Bool
    
    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    @Timestamp(key: "updated_at", on: .update)
    var updatedAt: Date?

    @Field(key: "description")
    var description: String?

    @Siblings(through: MockedResponseCollection.self, from: \.$mockedResponse, to: \.$collection)
    var collections: [Collection]
    
    init() {}

    init(id: UUID? = nil,
         path: String,
         content: String,
         description: String?,
         isActive: Bool = true,
         replaceDates: Bool = false) {
        self.id = id
        self.path = path
        self.content = content
        self.description = description
        self.isActive = isActive
        self.replaceDates = replaceDates
    }
}

extension MockedResponse {
    struct Create: Content {
        var path: String
        var content: String
        var description: String?
    }
}
