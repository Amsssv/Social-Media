interface User {
    id: number,
    login: string,
    password: string
}

export let users: Array<User> = [
    {
        id: 1,
        login: "vasya@mail.ru",
        password: "hello",
    },
    {
        id: 2,
        login: "lesha@mail.ru",
        password: "world",
    },
]
