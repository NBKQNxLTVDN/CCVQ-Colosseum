import React from "react";
import { MathComponent } from "mathjax-react";
import { Parser, ProcessNodeDefinitions } from "html-to-react";

const customElements = {
  span: MathComponent,
  p: <p></p>,
};

// Boilerplate stuff
const htmlParser = new Parser(React);
const processNodeDefinitions = new ProcessNodeDefinitions(React);
function isValidNode() {
  return true;
}

// Custom instructions for processing nodes
const processingInstructions = [
  // Create instruction for custom elements
  {
    shouldProcessNode: (node) => {
      // Process the node if it matches a custom element
      return node.name && customElements[node.name];
    },
    processNode: (node, children) => {
      let CustomElement = customElements[node.name];

      if (node.attribs.class === "math display" && node.name === "span") {
        const string = node.children[0].data.slice(2, -2);
        return <MathComponent tex={String.raw`${string}`} display={false} />;
      }

      if (node.name === "p") {
        return <>{children}</>;
      }
      return <CustomElement />;
    },
  },
  // Default processing
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

const HTMLStringConvert = (props) => {
  const _renderHTMLString = (htmlString) => {
    return htmlParser.parseWithInstructions(
      htmlString,
      isValidNode,
      processingInstructions
    );
  };
  const { string } = props;
  return <>{_renderHTMLString(string)}</>;
};

export default HTMLStringConvert;
