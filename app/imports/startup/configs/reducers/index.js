// Test

const initialState = {
  message: 'Hello',
};

export function generalState(payload, action) {
  if (typeof payload == 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'OPEN_MODAL':
      return Object.assign({}, state, {
        isActive: action.isActive,
        component: action.component,
        data: action.data,
      });
      break;
    default:
      return payload;
  }
}
