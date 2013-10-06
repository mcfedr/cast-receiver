var CAST_APP_ID = "938337b2-f581-41c4-b2c4-73e9cbe9e7ea",
    FEDR_NAMESPACE = 'cast.fedr.co';

var receiver = new cast.receiver.Receiver(CAST_APP_ID, [cast.receiver.RemoteMedia.NAMESPACE, FEDR_NAMESPACE], "", 5);

var remoteMedia = new cast.receiver.RemoteMedia();
remoteMedia.addChannelFactory(receiver.createChannelFactory(cast.receiver.RemoteMedia.NAMESPACE));

var channelHandler = new cast.receiver.ChannelHandler(FEDR_NAMESPACE);
channelHandler.addChannelFactory(receiver.createChannelFactory(FEDR_NAMESPACE));

define(function() {
    return ['$scope', function ($scope) {
        var $localVideo = $('#localVideo'),
            $third = $('#third'),
            $flash = $('flash');
            
        $scope.video = {
            name: 'The Video Name'
        };

        remoteMedia.setMediaElement($localVideo[0]);
        
        $localVideo.on("loadedmetadata", function() {
            $scope.$apply(function() {
                $scope.video.name = remoteMedia.getTitle();
                $third.addClass('show');
                setTimeout(function() {
                    $third.removeClass('show');
                }, 5000);
            });
        });
        
        $localVideo.on('play', function() {
            flash('play');
        });
        
        $localVideo.on('pause', function() {
            flash('pause');
        });
        
        function flash(type) {
            $scope.$apply(function() {
                $scope.flash = type;
                $flash.addClass('show');
                setTimeout(function() {
                    $flash.removeClass('show');
                }, 1000);
            });
        }
        
        channelHandler.addEventListener(cast.receiver.Channel.EventType.MESSAGE, function(e) {
            console.log(e);
        });
        
        receiver.start();
    }];
});
