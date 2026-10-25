import { useResponsive, webPointer } from "@/hooks/use-responsive";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AudioPlayerProps = {
  source: number;
  colors: {
    text: string;
    primary: string;
  };
};

function formatTime(seconds: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const secs = Math.floor(safeSeconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ source, colors }: AudioPlayerProps) {
  const { isTablet } = useResponsive();

  // Kích thước gọn hơn cho web/tablet, mobile giữ như cũ
  const skipIconSize = isTablet ? 26 : 34;
  const playSize = isTablet ? 42 : 54;
  const playIconSize = isTablet ? 21 : 27;

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    }).catch(console.error);
  }, []);

  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const duration = status.duration || 0;
  const position = status.currentTime || 0;

  const skip = (seconds: number) => {
    const target = Math.max(0, Math.min(duration, position + seconds));
    void player.seekTo(target);
  };

  const togglePlayback = () => {
    if (status.playing) {
      player.pause();
      return;
    }

    // screen lock
    player.setActiveForLockScreen(true, {
      title: "23.5 Degree the World Incline",
      artist: "Story Reader",
      albumTitle: "Audiobook",
    });

    // Phát lại từ đầu nếu audio đã chạy đến cuối.
    if (duration > 0 && position >= duration) {
      void player.seekTo(0).then(() => player.play());
      return;
    }

    player.play();
  };

  const playDisabled = !status.isLoaded || !!status.error;

  return (
    <View style={[styles.container, isTablet && styles.containerCompact]}>
      {status.error ? (
        <Text style={[styles.message, { color: colors.text }]}>
          Không thể phát audio. Vui lòng thử lại.
        </Text>
      ) : null}

      {!status.isLoaded && !status.error ? (
        <Text style={[styles.message, { color: colors.text }]}>
          Đang tải audio...
        </Text>
      ) : null}

      <Slider
        style={[styles.slider, isTablet && styles.sliderCompact]}
        minimumValue={0}
        maximumValue={Math.max(duration, 1)}
        value={Math.min(position, Math.max(duration, 1))}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#BDBDBD"
        thumbTintColor={colors.primary}
        disabled={!status.isLoaded || duration <= 0}
        onSlidingComplete={(value) => {
          void player.seekTo(value);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={[styles.time, { color: colors.text }]}>
          {formatTime(position)}
        </Text>
        <Text style={[styles.time, { color: colors.text }]}>
          {formatTime(duration)}
        </Text>
      </View>

      <View style={[styles.controls, isTablet && styles.controlsCompact]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tua lùi 10 giây"
          disabled={!status.isLoaded}
          onPress={() => skip(-10)}
          hitSlop={10}
          style={[styles.skipButton, webPointer]}
        >
          <Ionicons
            name="reload-outline"
            size={skipIconSize}
            color={colors.text}
            style={styles.flipX}
          />
          <Text style={[styles.skipLabel, { color: colors.text }]}>10s</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={status.playing ? "Tạm dừng" : "Phát audio"}
          disabled={playDisabled}
          onPress={togglePlayback}
          style={[
            styles.playButton,
            {
              width: playSize,
              height: playSize,
              borderRadius: playSize / 2,
              backgroundColor: colors.primary,
            },
            webPointer,
            playDisabled && styles.disabled,
          ]}
        >
          <Ionicons
            name={status.playing ? "pause" : "play"}
            size={playIconSize}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tua tới 15 giây"
          disabled={!status.isLoaded}
          onPress={() => skip(15)}
          hitSlop={10}
          style={[styles.skipButton, webPointer]}
        >
          <Text style={[styles.skipLabel, { color: colors.text }]}>15s</Text>
          <Ionicons
            name="reload-outline"
            size={skipIconSize}
            color={colors.text}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
  containerCompact: {
    paddingVertical: 2,
  },
  message: {
    fontSize: 13,
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 36,
  },
  sliderCompact: {
    height: 28,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -2,
  },
  time: {
    fontSize: 12,
    fontVariant: ["tabular-nums"],
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginTop: 18,
  },
  controlsCompact: {
    gap: 24,
    marginTop: 4,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 6,
  },
  skipLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  flipX: {
    transform: [{ scaleX: -1 }],
  },
});
