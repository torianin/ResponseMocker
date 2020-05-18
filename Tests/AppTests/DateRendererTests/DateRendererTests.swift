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
    
    func testRenderMultilineString() {
        let testString = #"""
        "exampleString":{
           "date":"<%Date|-3600|yyyy-MM-dd'T'HH:mm:ss'Z'%>",
           "adjustedDate":{
              "date":"<%Date|-1800|yyyy-MM-dd'T'HH:mm:ss%>",
              "exampleString":"Example"
           }
        }
        """#
        let resultDateString = sut.render(content: testString)
        let expectedDateString = #"""
        "exampleString":{
           "date":"2020-05-18T21:54:53Z",
           "adjustedDate":{
              "date":"2020-05-18T22:24:53",
              "exampleString":"Example"
           }
        }
        """#
        XCTAssertEqual(resultDateString, expectedDateString)
    }
}
