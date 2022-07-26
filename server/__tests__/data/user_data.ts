interface User {
    email: string,
    password: string
}

export let users: Array<User> = [
    {
        email: "vasya@mail.ru",
        password: "hello"
    },
    {
        email: "lesha@mail.ru",
        password: "world",
    },
]
