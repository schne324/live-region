import 'jsdom-global/register';
import test from 'ava';
import LiveRegion from '../';

test('creates/configures the region element with defaults', t => {
  const { region } = new LiveRegion();

  t.is(region.getAttribute('aria-live'), 'polite');
  t.is(region.getAttribute('role'), 'log');
  t.is(region.getAttribute('aria-relevant'), 'additions');
  t.is(region.getAttribute('aria-atomic'), 'false');
});

test('accepts options', t => {
  const { region } = new LiveRegion({
    ariaLive: 'assertive',
    role: 'status',
    ariaAtomic: 'true',
    ariaRelevant: 'removals'
  });

  t.is(region.getAttribute('aria-live'), 'assertive');
  t.is(region.getAttribute('role'), 'status');
  t.is(region.getAttribute('aria-relevant'), 'removals');
  t.is(region.getAttribute('aria-atomic'), 'true');
});

test('applies offscreen styles', t => {
  const { region } = new LiveRegion();

  t.is(region.style.position, 'absolute');
  t.is(region.style.width, '1px');
  t.is(region.style.height, '1px');
  t.is(region.style.marginTop, '-1px');
  t.is(region.style.clip, 'rect(1px, 1px, 1px, 1px)');
  t.is(region.style.overflow, 'hidden');
});

test('appends announcment message to the region', t => {
  const liveRegion = new LiveRegion();

  liveRegion.announce('BOOGNISH');
  t.is(liveRegion.region.querySelector('div').innerHTML, 'BOOGNISH');
});

test.cb('expires (removes announcement node after timeout)', t => {
  const liveRegion = new LiveRegion();
  liveRegion.announce('hello world', 10);
  t.is(liveRegion.region.childElementCount, 1);
  setTimeout(() => {
    t.is(liveRegion.region.childElementCount, 0);
    t.end();
  }, 11);
});

test('destroy removes region from the DOM', t => {
  const liveRegion = new LiveRegion();
  t.true(document.contains(liveRegion.region));

  liveRegion.destroy();
  t.false(document.contains(liveRegion.region));
});
