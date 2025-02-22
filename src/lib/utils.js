import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

let token = null;
let api = 'https://finance-backend-pyf8.onrender.com';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
};

export function setLocalStorageItem(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

export function getLocalStorageItem(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}


export function generateRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor.padStart(7, '#');
};

export async function login(fdata) {
  const response = await fetch(`${api}/api/v1/user/login`, {
    method: "POST",
    body: JSON.stringify(fdata),
    headers: {
      'content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while login');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message, token } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    setLocalStorageItem('financejwt', token)
    return { message, success, token }
  }
}
export async function signup(fdata) {
  const response = await fetch(`${api}/api/v1/user/signup`, {
    method: "POST",
    body: JSON.stringify(fdata),
    headers: {
      'content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while signup');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message, token } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    setLocalStorageItem('financejwt', token)
    return { message, success }
  }
};

export async function logout() {
  const response = await fetch(`${api}/api/v1/user/logout`, {
    method: "POST",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while signup');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message, } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    removeLocalStorageItem('financejwt')
    return { message, success }
  }
}

export async function getTransaction() {
  const response = await fetch(`${api}/api/v1/transation`, {
    method: "GET",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while get data');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
}

export async function getcategory() {
  const response = await fetch(`${api}/api/v1/budget`, {
    method: "GET",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while get data');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function getcategoryReport() {
  const response = await fetch(`${api}/api/v1/budget/budget-alerts`, {
    method: "GET",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while get data');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function createTransaction(fdata) {
  const response = await fetch(`${api}/api/v1/transation`, {
    method: "POST",
    body: JSON.stringify(fdata),
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while crete');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function editTransaction({ values, id }) {
  const response = await fetch(`${api}/api/v1/transation/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while update');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};
export async function editCategory({ values, id }) {
  const response = await fetch(`${api}/api/v1/budget/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while update');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function deleteTransactionData({ id }) {
  const response = await fetch(`${api}/api/v1/transation/${id}`, {
    method: "DELETE",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while update');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function deleteBudgetData({ id }) {
  const response = await fetch(`${api}/api/v1/budget/${id}`, {
    method: "DELETE",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while update');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function getEditTransactionData(id) {
  const response = await fetch(`${api}/api/v1/transation/${id}`, {
    method: "GET",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while crete');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function getEditBudgetData(id) {
  const response = await fetch(`${api}/api/v1/budget/${id}`, {
    method: "GET",
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while crete');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};

export async function createnewBudget(fdata) {
  const response = await fetch(`${api}/api/v1/budget`, {
    method: "POST",
    body: JSON.stringify(fdata),
    headers: {
      'content-Type': 'application/json',
      "authorization": `Bearer ${getLocalStorageItem('financejwt')}`
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while crete');
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const { success, message } = await response.json();
  if (!success) {
    throw new Error(message)
  } else {
    return message
  }
};