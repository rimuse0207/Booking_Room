import React, { useState } from 'react';

function TreeNode({ node }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="tree-node">
            <h2 onClick={toggleOpen}>{node.title}</h2>
            {isOpen && (
                <div className="tree-content">
                    <p dangerouslySetInnerHTML={{ __html: node.content }} />
                    {node.children && node.children.map((child, index) => <TreeNode key={index} node={child} />)}
                </div>
            )}
        </div>
    );
}

export default TreeNode;
