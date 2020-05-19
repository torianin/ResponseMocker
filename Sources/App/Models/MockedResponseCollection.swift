import Fluent
import Vapor

final class MockedResponseCollection: Model, Content {
    static let schema: String = "response_collection"

    @ID(key: .id)
    var id: UUID?

    @Parent(key: "collection_id")
    var collection: Collection

    @Parent(key: "mocked_response_id")
    var mockedResponse: MockedResponse

    init() {}

    init(collectionID: UUID, mockedResponseID: UUID) {
        self.$collection.id = collectionID
        self.$mockedResponse.id = mockedResponseID
    }
}
