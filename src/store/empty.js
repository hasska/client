export default function empty(state = { data: { } }, action) {
    state = {
      type: action.type,
      data: action.payload,
    };
    return state;
}