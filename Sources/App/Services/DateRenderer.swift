import Vapor

final class DateRenderer {
    
    let dateProvider: DateProviderType
    
    init(dateProvider: DateProviderType = DateProvider() ) {
        self.dateProvider = dateProvider
    }
    
    func render(content: String) -> String {
        var cleanedContent = content
        let commandPattern = "<%(.*?)%>"
        let ranges = content.ranges(of: commandPattern, options: .regularExpression)
        for range in ranges {
            let template = String(content[range])
            let tokens = template.dropFirst(2).dropLast(2).split(separator: "|")
            if let timeInterval = tokens.get(at: 1),
                let dateFormat = tokens.get(at: 2),
                let timeIntervalValue = Double(String(timeInterval)) {
                                
                let dateFormatter = DateFormatter()
                dateFormatter.timeZone = TimeZone(identifier: "UTC")
                dateFormatter.dateFormat = String(dateFormat)
                let dateString = dateFormatter.string(from: dateProvider.currentDate().addingTimeInterval(timeIntervalValue))
        
                cleanedContent = cleanedContent.replacingOccurrences(of: template, with: dateString)
            }
        }
        return cleanedContent
    }
}
