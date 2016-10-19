import { TimeTrackerPage } from './app.po';

describe('time-tracker App', function() {
  let page: TimeTrackerPage;

  beforeEach(() => {
    page = new TimeTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
