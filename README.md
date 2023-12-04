
# Requirements:

## Start Screen:

The application should begin with a screen prompting the user to enter an income or expense.

For each transaction, the user should provide a description and the amount. Example formats:

Expense: Food - RM12

Income: Monthly pay - RM550

Include a button labeled "See Your Expenses" to navigate to the pie chart displaying all expenses from previous months.

## Pie Chart:

The pie chart should be dynamic and fetch data from MongoDB.

Display a breakdown of expenses and the remaining budget.

Use a Pie Chart library to visualize the data.

### Database Structure (MongoDB):

Save transaction information in the database, including:

User ID

Type (Income/Expense)

Description

Amount

Timestamp (for tracking previous months)

## JSON Format for Database:

```{
  "transactions": [
    {
      "userId": "user123",
      "type": "expense",
      "description": "Food",
      "amount": 12,
      "timestamp": "2023-11-28T15:30:00.000Z"
    },
    {
      "userId": "user123",
      "type": "income",
      "description": "Monthly pay",
      "amount": 550,
      "timestamp": "2023-11-28T15:32:00.000Z"
    }
    // Add more transactions as needed
  ]
} 

```

## Explanation:

### User ID: Identifies the user for whom the transaction is recorded.

### Type: Specifies if it's an income or expense.

### Description: Describes the nature of the transaction (e.g., Food, Monthly pay).

### Amount: Represents the monetary value of the transaction.

### Timestamp: Records the date and time of the transaction for tracking previous months.
