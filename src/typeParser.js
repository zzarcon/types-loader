// @flow

import {readFileSync} from 'fs';
import * as ts from "typescript";

const walkNode = (node, definitions) => {
  switch (node.kind) {
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.EnumDeclaration:
      definitions.push(node.getFullText());
  }

  ts.forEachChild(node, (n) => {
    walkNode(n, definitions);
  });

  return definitions;
}

const walkSource = (sourceFile) => {
  return walkNode(sourceFile, []);
};

const getDefinitionsFromFile = (fileName: string) => {
  return getDefinitionsFromSource(fileName, readFileSync(fileName).toString());
};

const getDefinitionsFromSource = (fileName: string, source) => {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES6, true);
  const definitions = walkSource(sourceFile);

  return definitions;
};

module.exports = {
  getDefinitionsFromSource,
  getDefinitionsFromFile
};