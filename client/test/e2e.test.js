import { Selector, ClientFunction } from 'testcafe';
const getWindowLocation = ClientFunction(() => window.location.href);
const getWindowOrigin = ClientFunction(() => window.location.origin);

fixture('General Test for Trezorit Chanel').page('https://localhost:4000');

test('user can create a new session', async (browser) => {
  await browser.click('[data-test="createSessionButton"]');
  await browser.expect(getWindowLocation()).contains('/session');
});

test('session page creates URL to share', async (browser) => {
  await browser.click('[data-test="createSessionButton"]');
  await browser.expect(Selector('[data-test="linkToShare"]').value).contains('/reciever#');
});

test('user can open a new window with URL to share', async (browser) => {
  await browser.click('[data-test="createSessionButton"]');
  const linkToShare = await Selector('[data-test="linkToShare"]').value;
  await browser.openWindow(linkToShare);
  await browser.expect(getWindowLocation()).eql(linkToShare);
});

test('input text appears on recievers screen', async (browser) => {
  await browser.click('[data-test="createSessionButton"]');
  const initWindow = await browser.getCurrentWindow();
  const linkToShare = await Selector('[data-test="linkToShare"]').value;
  const recieverWindow = await browser.openWindow(linkToShare);
  await browser.switchToWindow(initWindow);
  await browser.typeText('[data-test="inputField"]', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  await browser.switchToWindow(recieverWindow);
  await browser.expect(Selector('[data-test="messageText"]').innerText).eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
});

test('reciever gets "no access" warning message if there is no secret key in URL', async (browser) => {
  await browser.click('[data-test="createSessionButton"]');
  let linkToShare = await getWindowOrigin();
  linkToShare += '/reciever';
  await browser.openWindow(linkToShare);
  await Selector('[data-test="noAccessMessage"]')();
});
