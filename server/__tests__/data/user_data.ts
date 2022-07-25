interface User {
    login: string,
    password: string
}

export let users: Array<User> = [
    {
        login: "vasya@mail.ru",
        password: "hello"
    },
    {
        login: "lesha@mail.ru",
        password: "world",
    },
]
