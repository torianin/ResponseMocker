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

    @OptionalParent(key: "user_id")
    var user: User?

    init() {}

    init(id: UUID? = nil,
         path: String,
         content: String,
         description: String?,
         isActive: Bool = true,
         replaceDates: Bool = false,
         userId: User.IDValue?) {
        self.id = id
        self.path = path
        self.content = content
        self.description = description
        self.isActive = isActive
        self.replaceDates = replaceDates
        self.$user.id = userId
    }
}

extension MockedResponse {
    struct Update: Content {
        var path: String
        var content: String
        var description: String?
        var isActive: Bool
        var replaceDates: Bool
    }
}


extension MockedResponse {
    struct Get: Content {
        var id: UUID?
        var path: String
        var content: String
        var description: String?
        var isActive: Bool
        var replaceDates: Bool
        var createdAt: Date?
        var updatedAt: Date?
        var createdBy: String?

        init(mockedResponse: MockedResponse) {
            self.id = mockedResponse.id
            self.path = mockedResponse.path
            self.content = mockedResponse.content
            self.description = mockedResponse.description
            self.isActive = mockedResponse.isActive
            self.replaceDates = mockedResponse.replaceDates
            self.createdAt = mockedResponse.createdAt
            self.updatedAt = mockedResponse.updatedAt
            self.createdBy = mockedResponse.user?.name
        }
    }
}

extension MockedResponse {
    struct Create: Content {
        var path: String
        var content: String
        var description: String?
    }
}
