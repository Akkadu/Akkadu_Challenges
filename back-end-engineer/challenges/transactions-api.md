# Overview

This task is to create a Node.js / Express server with API endpoints to query, analyze, and filter data from a provided MySQL Dump file.

## Prerequisites

You should have an installation of Node.js, MySQL, and Postman (to test the end results).

### Provisioning the MySQL DB

Included in the repo is an SQL dump (self-contained export of the database) at /back-end-engineer/assers/dump.sql that contains the necessary SQL statements to recreate the MySQL database, its tables, and its data. There are various ways that you can use this file to recreate the database, we recommend [importing it in MySQL Workbench](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html).

- [SQL Dump](/back-end-engineer/assets/dump.sql)
- [MySQL Workbench Import SQL Dump](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html)

### Understanding the Schemas

![ER-diagram.png](/back-end-engineer/assets/ER_diagram.png)

- Users
  - These are the users of a platform, each of whom may have multiple accounts.
  - One user may only have one `main` account, but may have multiple `secondary` accounts.
- Accounts
  - An account may be associated with only one user, while having multiple transactions.
  - An account may either be a `main` or `secondary` account.
- Transactions
  - A transaction may be associated with only one account.

## Task

Implement an API endpoint that meets the following specifications:

| Method    | Route                    |
|------     |-------------             |
| `GET`     | `/transactions?view=latest`   |

### Request parameters

The endpoint should accept some parameters that filter the selection:

| Method | Name | Type | Description |
|--------|------|------|-------------|
| `GET`  | `currency` | `string` | The name of the currency by which to group the transactions, this corresponds to the `currency` field in the `accounts` table. <br>Example values: `EUR`, `USD`, `GBP`.
| `GET`  | `active_users_only` | `boolean` | Whether to get the transactions for all users, or only active users (these are users with `is_active = True` in the `users` database)
| `GET`  | `user_type` | `string` | The type of the user to select. Values can be {`all`, `corporate`, `individual`}. This corresponds to the `type` field on the `users` table. Note that `all` means all `type`s of users should be included.
| `GET`  | `account_type` | `string` | The type of account to get transactions for. This corresponds to the field `type` in the `accounts` table. Values can be one of {`all`, `main`, `secondary`}

You can view `currency` as the main parameter in of the endpoint. The remaining parameters are additional filters that let the user specify a narrower subset of data to include. For instance, if `active_users_only` is `true`, then the result should only include data associated with active users (users where `is_active` field is `true` in the `users` table); if `account_type` is `secondary`, then the response should only include data associated with secondary accounts (accounts where `type = 'secondary'` in `accounts` table).

### Response

Format: JSON

| HTTP | Description                     |
|------|---------------------------------|
| 200  | OK                              |

The response should return the latest transaction for each user / account that matches the filters, grouped by `country`. It should also contain the sum of all the transactions for each country.

A sample response is below:

```json
{
    "status": 0,
    "data": [
        {
            "country": "FR",
            "aggregate": {
                "balance": 1116, // sum of the balance for transactions in `latest_transactions`
                "percent_change": -0.15 // average of `percent_change` in `latest_transactions`
            },
            // latest transactions for each "FR" accounts that match the filters
            "transactions": [ 
                {
                    "id": 123,
                    "account_id": 14,
                    "balance": 222,
                    "percent_change": 0.2,
                    "event_type": "DEPOSIT",
                    "date": "2020-04-16T20:05:00Z"
                },
                {
                    "id": 53,
                    "account_id": 20,
                    "balance": 894,
                    "percent_change": -0.5,
                    "event_type": "WITHDRAW",
                    "date": "2020-04-14:05:00Z"
                }
            ]
        },
        {
            "country": "DE",
            "aggregate": {
                "balance": 450,
                "percent_change": -0.1
            },
            "transactions": [
                {
                    "id": 123,
                    "account_id": 14,
                    "balance": 100,
                    "percent_change": 0.5,
                    "event_type": "DEPOSIT",
                    "date": "2020-04-16T20:05:00Z"
                },
                {
                    "id": 123,
                    "account_id": 14,
                    "balance": 350,
                    "percent_change": -0.7,
                    "event_type": "WITHDRAW",
                    "date": "2020-04-16T20:05:00Z"
                },
            ]
        }
    }
}
```

## Evaluation

Your project should include:

- Self-documenting code
- A README.md that describes your strategy and implementation
- A [Postman](https://www.postman.com/) API collection

Be prepared to be interviewed about your implementation!

## Bonus Points

- Host your code on a server using any cloud service provider
- Include unit tests and a test script
- Clearly document your code
