const { UsersRecord } = require('../database/Records/UsersRecord');
const { pool } = require('../database/db');

afterAll(async () => {
  await pool.end();
});

/////////////////////////////////////////////////
test('Test UsersRecord - listAll', async () => {
  await pool.query('USE dziennik');

    const users = await UsersRecord.listAll();
    const id = users[0].id;

  expect(users).toBeDefined();
  expect(id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
});

/////////////////////////////////////////////////
test('should insert a new user record into the database', async () => {
    const newQuery = {
      username: 'andrzejek',
      hashPassword: 'testowy-hash',
      email: 'testowy@o2.pl',
    };
  
    const insertedId = await UsersRecord.insert([newQuery.username, newQuery.hashPassword, newQuery.email]);
    expect(insertedId).toBeTruthy();

    const newUser = await UsersRecord.selectByUsername([newQuery.username]);
   
    expect(newUser[0].id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
    expect(newUser).toHaveLength(1);
    expect(newUser[0].id).toBe(insertedId);
    expect(newUser[0].username).toBe(newQuery.username);
    expect(newUser[0].email).toBe(newQuery.email);

    await UsersRecord.delete(newUser[0].id);
  });

  test('should reject insertion with invalid email', async () => {
    const invalidEmail = 'invalid-email';
    await expect(UsersRecord.insert(['user', 'password', invalidEmail])).rejects.toThrow();

    const usersWithInvalidEmail = await UsersRecord.selectByEmail([invalidEmail]);
    expect(usersWithInvalidEmail).toHaveLength(0);
  });


