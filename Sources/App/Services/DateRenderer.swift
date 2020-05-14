import Vapor

final class DateRenderer {

    static func render(content: String) -> String {
        let commandPattern = "<%(.*?)%>"
        if let range = content.range(of: commandPattern, options: .regularExpression) {
            let template = String(content[range])
            guard let timeInterval = Double(template.dropFirst(2).dropLast(2).split(separator: " ")[1]) else { return content }
            let dateFormat = template.split(separator: "\"")[1]

            let dateFormatter = DateFormatter()
            dateFormatter.timeZone = TimeZone(identifier: "UTC")
            dateFormatter.dateFormat = String(dateFormat)
            let dateString = dateFormatter.string(from: Date().addingTimeInterval(timeInterval))
            
            return content.replacingOccurrences(of: template, with: dateString)
        }
        return content
    }
}
