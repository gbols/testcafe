import { Selector, ClientFunction } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);

const logout = async t => {
  await t
  .click(Selector('#pt-logout'))
  .click(Selector('#content').withText('Log out'));
};

const login = async t => {
  await t
      .click(Selector('button[type=submit]'))
      .click(Selector('#pt-login'))
      .expect(getLocation()).contains('UserLogin'); //asserts that we are on the login page.

      await t
      .click(Selector('#wpName1'))
      .typeText(Selector('#wpName1'), 'Johnny Dowe')
      .click(Selector('#wpPassword1'))
      .typeText(Selector('#wpPassword1'), '96#CMqi@_in8*wR')
      .click(Selector('button#wpLoginAttempt'))
      .expect(getLocation()).contains('search');
}

fixture `My first fixture`
    .page `https://www.wikipedia.org/`;

    test('users can search', async t => {
      await t
      .click(Selector('#searchInput'))
      .typeText(Selector('#searchInput'), 'vikings')
      .click(Selector('button[type=submit]'))
      .expect(getLocation()).contains('en.wikipedia.org/wiki/Vikings');
    });

    test('users can login to an existing account', async t => {
      await login(t);
    });


    test('users should be able to contribute', async t => {
      await login(t);

      /*
      some code to contribute to wikipedia
      */

      await logout(t);
    });

    