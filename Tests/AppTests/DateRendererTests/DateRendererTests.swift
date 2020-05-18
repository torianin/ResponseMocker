@testable import App
import XCTVapor

final class DateRendererTests: XCTestCase {
        
    let sut = DateRenderer(dateProvider: FakeDateProvider())
    
    func testRenderDate()  {
        let testString = #"<%Date|0|yyyy-MM-dd'T'HH:mm:ss'Z'%>"#
        let resultDateString = sut.render(content: testString)
        let expectedDateString = "2020-05-18T22:54:53Z"
        XCTAssertEqual(resultDateString, expectedDateString)
    }
    
    func testRenderTwoDates()  {
        let testString = #"<%Date|0|yyyy-MM-dd'T'HH:mm:ss'Z'%> <%Date|0|yyyy-MM-dd'T'HH:mm:ss'Z'%>"#
        let resultDateString = sut.render(content: testString)
        let expectedDateString = "2020-05-18T22:54:53Z 2020-05-18T22:54:53Z"
        XCTAssertEqual(resultDateString, expectedDateString)
    }
    
    func testRenderDateInTheMiddleOfTheText()  {
        let testString = #"Random text <%Date|0|yyyy-MM-dd'T'HH:mm:ss'Z'%> random text"#
        let resultDateString = sut.render(content: testString)
        let expectedDateString = "Random text 2020-05-18T22:54:53Z random text"
        XCTAssertEqual(resultDateString, expectedDateString)
    }
}
