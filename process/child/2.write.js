process.stdout.on('data', function(data){
    process.stderr.write(data);
})