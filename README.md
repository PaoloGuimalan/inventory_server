# Items Management System

A RESTful API for managing items with MongoDB as the database.

## Project Structure

```
server/
├── src/
│   ├── controllers/
│   │   └── itemController.ts    # Handles HTTP requests for items
│   ├── routes/
│   │   └── itemRoutes.ts        # Defines API endpoints
│   ├── services/
│   │   └── items/
│   │       ├── connections/     # Database connection configuration
│   │       ├── core/           # Core business logic
│   │       ├── models/         # TypeScript interfaces
│   │       └── schema/         # MongoDB schemas
│   └── app.ts                  # Express application setup
```

## API Endpoints

### Items

- `GET /api/items` - Get all items (paginated)

  - Headers:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)

- `GET /api/items/:context` - Search items by name or description

  - Headers:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)

- `GET /api/items/category/:context` - Search items by category

  - Headers:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)

- `GET /api/items/categories` - Get all unique categories

  - Headers:
    - `page`: Page number (default: 1)
    - `limit`: Categories per page (default: 10)

- `POST /api/items` - Create a new item

  - Body:
    ```json
    {
      "name": "string",
      "description": "string",
      "category": "string",
      "price": number
    }
    ```

- `PUT /api/items/:id` - Update an item

  - Body: Same as POST

- `DELETE /api/items/:id` - Delete an item

## Data Models

### Item

```typescript
interface Item {
  name: string; // Item name
  description: string; // Item description
  category: string; // Item category
  price: number; // Item price
  dateAdded: number; // Timestamp when item was added
}
```

## Database Schema

### Item Schema

```typescript
const item = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.Mixed, require: true },
  description: { type: mongoose.Schema.Types.Mixed, require: true },
  category: { type: mongoose.Schema.Types.Mixed, require: true, index: true },
  price: { type: Number, require: true },
  dateAdded: { type: Number, require: true },
});
```

## Core Services

### Items Service (`items.ts`)

- `createItemToDB(newItem: Item)`: Creates a new item
- `getItemsFromDB(page, limit)`: Gets paginated list of items
- `getCategoriesFromDB(page, limit)`: Gets paginated list of unique categories
- `getItemByIdFromDB(id)`: Gets a single item by ID
- `getItemsByNameDescFromDB(context, page, limit)`: Searches items by name/description
- `getItemsByCategoryFromDB(context, page, limit)`: Searches items by category
- `deleteItemFromDB(id)`: Deletes an item
- `updateItemFromDB(id, updatedItem)`: Updates an item

## Error Handling

The API uses a centralized error handling middleware that:

- Logs errors
- Returns appropriate HTTP status codes
- Provides error messages in a consistent format

## Pagination

All list endpoints support pagination with:

- `page`: Page number (1-based)
- `limit`: Items per page

Response format for paginated endpoints:

```json
{
  "items": [...],
  "meta": {
    "total": number,
    "limit": number,
    "page": number
  }
}
```

## Search Features

- Case-insensitive search using MongoDB's `$regex` with `$options: 'i'`
- Supports searching by:
  - Name
  - Description
  - Category

## Database Indexes

- `category` field is indexed for faster queries

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create the .env file within the base level of the folder

```env
PORT=3000
NODE_ENV=development
MONGODB_URL=your_mongodb_connection_string
```

3. Start the server:

For Development Environment

```bash
npm install
npm run dev
```

For Production

```bash
npm run build
npm start
```

## Docker Deployment

1. Build the Docker image:

```bash
docker build -t items-management-server .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env-file .env items-management-server
```

The container will:

- Expose port 3000
- Use environment variables from your .env file
- Run the production build of the application

## Development

- TypeScript for type safety
- Express.js for the web framework
- MongoDB for the database
- Mongoose for MongoDB object modeling
