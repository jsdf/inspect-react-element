import util from 'util';
import React from 'react';
import omit from 'lodash.omit';
import indentString from 'indent-string';

function inspectReactProp(propName, propValue) {
  if (typeof propValue == 'string') return `${propName}="${propValue}"`;
  return `${propName}={${util.inspect(propValue)}}`;
}

function inspectReactType(type) {
  if (!type) return '' + type;
  return typeof type == 'string' ? type : type.name || type.displayName;
}

function inspectReactNode(node, depth = 0) {
  if (!React.isValidElement(node)) {
    const childInspected = util.inspect(node);
    const childText = depth > 0 ? `{${childInspected}}` : childInspected;
    return childText;
  }

  const props = node.props || {};
  const propNames = Object.keys(omit(props, 'children'));
  const propsText = propNames.length && propNames
    .map(propName => inspectReactProp(propName, props[propName]))
    .join(' ');

  let childrenText;
  if (props.children) {
    const childrenInspected = [];
    React.Children.forEach(props.children, (node) => childrenInspected.push(inspectReactNode(node, depth + 1)));
    childrenText = childrenInspected.join('\n');
  }

  let nodeText = '<';
  nodeText += inspectReactType(node.type);
  if (propsText) nodeText += ` ${propsText}`;

  if (childrenText) {
    nodeText += '>\n';
    nodeText += indentString(childrenText, '  ', 1);
    nodeText += `\n</${inspectReactType(node.type)}>`;
  } else {
    nodeText += ' />';
  }
  return nodeText;
}

export default function inspectReactElement(element) {
  return inspectReactNode(element);
}
