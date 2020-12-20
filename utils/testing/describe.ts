const describe = (...labels: string[]) => {
  const label = labels.pop();
  return `${labels.join("::")} >> ${label}`;
};

export default describe;
