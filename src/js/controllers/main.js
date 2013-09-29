define(function() {
    return ['$scope', function CastC($scope) {
        var CAST_APP_ID = "938337b2-f581-41c4-b2c4-73e9cbe9e7ea",
            $localVideo = $('#localVideo');

        var receiver = new cast.receiver.Receiver(CAST_APP_ID, [cast.receiver.RemoteMedia.NAMESPACE], "", 5);
        var remoteMedia = new cast.receiver.RemoteMedia();
        remoteMedia.addChannelFactory(receiver.createChannelFactory(cast.receiver.RemoteMedia.NAMESPACE));
        receiver.start();
        remoteMedia.setMediaElement(elem);

        $scope.video = {
            name: 'The Video Name'
        };
    }];
});
