import Foundation

extension String {

    // Source: https://stackoverflow.com/a/57272276/1819496

    func matches(path pattern: String) -> Bool {
        var strIndex = self.startIndex, matchIndex = self.startIndex
        var patternIndex = pattern.startIndex, asteriskIndex = pattern.endIndex

        while strIndex < self.endIndex {
            //Characters match, or question mark
            if patternIndex < pattern.endIndex
                && (self[strIndex] == pattern[patternIndex] || pattern[patternIndex] == "?") {
                strIndex = self.index(after: strIndex)
                patternIndex = pattern.index(after: patternIndex)
            }
            //Asterisk character
            else if patternIndex < pattern.endIndex && pattern[patternIndex] == "*" {
                asteriskIndex = patternIndex
                matchIndex = strIndex
                patternIndex = pattern.index(after: patternIndex)
            }
            else if asteriskIndex != pattern.endIndex {
                patternIndex = pattern.index(after: asteriskIndex)
                matchIndex = self.index(after: matchIndex)
                strIndex = matchIndex
            }
            else { return false }
        }

        //Asterisk character at the end of the pattern
        while patternIndex < pattern.endIndex && pattern[patternIndex] == "*" {
            patternIndex = pattern.index(after: patternIndex)
        }

        return patternIndex == pattern.endIndex
    }
    
    // Source: https://stackoverflow.com/questions/36865443/get-all-ranges-of-a-substring-in-a-string-in-swift
    
    func ranges(of substring: String, options: CompareOptions = [], locale: Locale? = nil) -> [Range<Index>] {
        var ranges: [Range<Index>] = []
        while let range = range(of: substring, options: options, range: (ranges.last?.upperBound ?? startIndex)..<endIndex, locale: locale) {
            ranges.append(range)
        }
        return ranges
    }
}
