'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classNames = {
  image: '.c-Avatar__photo',
  initials: '.c-Avatar__title'
};

describe('Name', function () {
  test('Initializes first/last name to two letters', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Ron Burgandy' }));
    var title = wrapper.find(classNames.initials);

    expect(title.text()).toBe('RB');
  });

  test('Initializes multi-word names to two letters', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Buddy the Elf' }));
    var title = wrapper.find(classNames.initials);

    expect(title.text()).toBe('BE');
  });

  test('Initializes single names to one letters', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Buddy' }));
    var title = wrapper.find(classNames.initials);

    expect(title.text()).toBe('B');
  });
});

describe('Image', function () {
  test('Render image if image prop is specified', function () {
    var src = 'buddy.jpg';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { name: 'Buddy the Elf', image: src }));
    var image = wrapper.find('img');

    expect(image.exists()).toBeTruthy();
    expect(image.prop('src')).toBe(src);
  });

  test('Rendered image should have correct alt/title attributes', function () {
    var name = 'Buddy the Elf';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { name: name, image: 'buddy.jpg' }));
    var image = wrapper.find('img');

    expect(image.prop('alt')).toBe(name);
    expect(image.prop('title')).toBe(name);
  });

  test('Has the correct className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { name: 'Buddy the Elf', image: 'buddy.jpg' }));
    var image = wrapper.find('img');

    expect(image.prop('className')).toContain('c-Avatar__photo');
  });

  test('Replaces Initials with image', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { name: 'Buddy the Elf', image: 'buddy.jpg' }));
    var initials = wrapper.find(classNames.initials);

    expect(initials.exists()).toBeFalsy();
  });

  test('Use "title" prop as alt/title for img, if specified', function () {
    var title = 'SANTAAAAAA';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { name: 'Buddy the Elf', image: 'buddy.jpg', title: title }));
    var image = wrapper.find('img');

    expect(image.prop('alt')).toBe(title);
    expect(image.prop('title')).toBe(title);
  });
});

describe('ClassNames', function () {
  test('Accept classNames', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Buddy', size: 'sm', className: 'not now arctic puffin' }));

    var classNames = wrapper.prop('className');

    expect(classNames).toContain('c-Avatar');
    expect(classNames).toContain('not');
    expect(classNames).toContain('now');
    expect(classNames).toContain('arctic');
    expect(classNames).toContain('puffin');
  });
});

describe('Size', function () {
  test('Apply size classes', function () {
    var sm = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Buddy', size: 'sm' }));
    var lg = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'Buddy', size: 'lg' }));

    expect(sm.prop('className')).toContain('is-sm');
    expect(lg.prop('className')).toContain('is-lg');
  });
});