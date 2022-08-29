/**
 * 判断对象中是否存在空属性
 */
 const existEmptyProperty = (form) => {
    for (let key of Object.keys(form)) {
      if (!form[key]) {
        return true;
      }
    }
    return false;
  };

  /**
 * 更新labels,提示用户输入
 */
const updateLabels = (labels, form) => {
    let newLabels = labels.map((item) => {
      if (!form[item[1]]) {
        item[2] = true;
      } else {
        item[2] = false;
      }
      return item;
    });
    return newLabels;
  };