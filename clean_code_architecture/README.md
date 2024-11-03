# Clean Architecture Feed Reader

A command-line RSS/Atom feed reader application built using Clean Architecture principles.

## Architecture Overview

This application follows Clean Architecture patterns with the following layers:

- **Entities**: Core business objects
- **Use Cases**: Application-specific business rules
- **Adapters**: Interface adapters
- **Frameworks**: External frameworks and tools

### Directory Structure

```
clean_code_architecture/
├── adapters/
│   ├── consolePrompt.js       # CLI interface
│   ├── feedController.js      # Feed operations controller
│   ├── feedRepository.js      # Feed data access
│   └── fileStorage.js         # File system storage
├── contracts/
│   ├── feedControllerContract.js
│   ├── feedRepositoryContract.js
│   ├── promptContract.js
│   └── storageContract.js
├── entities/
│   └── feed.js               # Feed business object
├── frameworks/
│   ├── application.js        # Main application setup
│   ├── container.js          # Dependency injection container
│   └── registry.js           # Service registry
├── usecases/
│   ├── addFeedUseCase.js
│   ├── deleteFeedUseCase.js
│   ├── listFeedsUseCase.js
│   └── openFeedUseCase.js
├── config.js                 # Application configuration
├── constants.js              # Constant definitions
└── index.js                 # Application entry point
```

## Features

- Add RSS/Atom feeds
- List saved feeds
- Delete feeds
- Open feeds to view entries
- Persistent storage using JSON file
- Command-line interface

## Commands

- `a <url>` - Add new feed URL
- `d <index>` - Delete feed at index
- `o <index> [entries]` - Open feed at index (default 5 entries)
- `l` - List all feeds
- `q` - Quit application
- `?` - Show help menu

## Technical Details

### Dependencies
- Node.js native modules only (no external dependencies)
- ES Modules syntax
- Async/await patterns

### Design Patterns
- Dependency Injection
- Repository Pattern
- Command Pattern
- Interface Segregation
- Single Responsibility

## Running the Application

```bash
node index.js
```

## Implementation Notes

- Uses Clean Architecture to maintain separation of concerns
- Implements contracts (interfaces) for all major components
- Dependency injection for better testability
- File-based storage using JSON
- Error handling throughout the application
- Type annotations using JSDoc

## Adding New Features

1. Create new use case in `usecases/`
2. Add corresponding method to `FeedController`
3. Register new use case in `Registry`
4. Add command handler in `Application`

## Testing

To add tests:
1. Create corresponding test files for each component
2. Mock dependencies using contracts
3. Test each layer independently

## Future Improvements

- Add actual RSS/Atom feed parsing
- Implement feed refresh functionality
- Add categories/tags for feeds
- Support for different storage backends
- Add unit tests
- Add configuration options
