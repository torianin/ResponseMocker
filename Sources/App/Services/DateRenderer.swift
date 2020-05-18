import Vapor

final class DateRenderer {
    
    let dateProvider: DateProviderType
    
    init(dateProvider: DateProviderType = DateProvider() ) {
        self.dateProvider = dateProvider
    }
    
    func render(content: String) -> String {
        let commandPattern = "<%(.*?)%>"
        for range in content.ranges(of: commandPattern, options: .regularExpression) {
            let template = String(content[range])
            let tokens = template.dropFirst(2).dropLast(2).split(separator: "|")
            guard let timeInterval = Double(tokens[1]),
                let dateFormat = tokens.last else { return content }

            let dateFormatter = DateFormatter()
            dateFormatter.timeZone = TimeZone(identifier: "UTC")
            dateFormatter.dateFormat = String(dateFormat)
            let dateString = dateFormatter.string(from: dateProvider.currentDate().addingTimeInterval(timeInterval))
            
            return content.replacingOccurrences(of: template, with: dateString)
        }
        return content
    }
}
