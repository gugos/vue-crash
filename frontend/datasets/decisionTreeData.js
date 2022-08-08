export const decisionTreeData = {
    name: "Node1",
    children: [
        {
            name: "Child1",
            parent: "Node1",
            children: [
                { name: "Grandchild1", parent: "Child1" },
                { name: "Grandchild2", parent: "Child1" }
            ]
        },
        {
            name: "Child2",
            parent: "Node1",
            children: [
                { name: "Grandchild3", parent: "Child2" }
            ]
        }
    ]
}
