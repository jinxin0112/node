process.argv.slice(2).forEach(item=>{
    process.send(item);
});
process.send('close');
