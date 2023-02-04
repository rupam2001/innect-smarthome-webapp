export const DUMMY_ROOMS = [
    {
        _id:"roomid1",
        title: "Room 1",
        devices:[ { _id: "d1", switches:[ { _id: "l1", title:" Light 1"},{ _id: "l2", title:" Light 2"},{ _id: "l3", title:" Light 3"},{ _id: "l4", title:" Light 4"},{ _id: "l5", title:" Light 5"},{ _id: "l6", title:" Light 6"},{ _id: "l7", title:" Light 7"},{ _id: "l8", title:" Light 8"}]  }, { _id: "d2", switches:[ { _id: "l1", title:" Light 1"},{ _id: "l2", title:" Light 2"},{ _id: "l3", title:" Light 3"},{ _id: "l4", title:" Light 4"},{ _id: "l5", title:" Light 5"},{ _id: "l6", title:" Light 6"},{ _id: "l7", title:" Light 7"},{ _id: "l8", title:" Light 8"}]  }]
    },
    {
        _id:"roomid2",
        title: "Room 2",
        devices:[{ _id: "d3", switches:[ { _id: "l1", title:" Light 1"},{ _id: "l2", title:" Light 2"},{ _id: "l3", title:" Light 3"},{ _id: "l4", title:" Light 4"},{ _id: "l5", title:" Light 5"},{ _id: "l6", title:" Light 6"},{ _id: "l7", title:" Light 7"},{ _id: "l8", title:" Light 8"}]  }]
    },
    {
        _id:"roomid3",
        title: "Main Hall"
    },
    {
        _id:"roomid4",
        title: "Drawing Room"
    },
    {
        _id:"roomid5",
        title: "Toilet 1"
    },
    {
        _id:"roomid6",
        title: "Toilet 2"
    },
    {
        _id:"roomid7",
        title: "Kitchen"
    },
    {
        _id:"roomid8",
        title: "Stairs"
    },
    {
        _id:"roomid1",
        title: "Corridor"
    }
]


export const DEVICES = [
    {
        _id:"d1",
        states:{ l1: false, l2: true, l3: false, l4: true, l5: false, l6: false, l7: true, l8: true}
    },
    {
        _id:"d2",
        states:{ l1: false, l2: true, l3: false, l4: true, l5: false, l6: false, l7: true, l8: true}

    },
    {
        _id:"d3",
        states:{ l1: false, l2: true, l3: false, l4: true, l5: false, l6: false, l7: true, l8: true}
    }
]