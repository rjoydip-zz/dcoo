import sinon from 'sinon';
import logger from '../lib/logger';
import * as utils from '../lib/utils';

class Logger {
  @logger('logger msg', {
    type: 'info'
  })
  loggerFn() {
    return true;
  }
};

describe('@logger', function() {

  beforeEach(function () {
    sinon.spy(utils, 'info');
  });

  afterEach(function () {
    utils.info.restore();
  });

  it('loggerFn', function() {
    const log = new Logger();
    log.loggerFn().should.equal(true);
    utils.info.should.have.been.calledOnce;
    utils.info.should.have.been.calledWith('Logger#loggerFn: logger msg');
  });

});
