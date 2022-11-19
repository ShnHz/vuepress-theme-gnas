---
config: {
    directory : true
}
---

## 滑动窗口
<p class="date">2022/11/15 10:52:46 
<span id="/blog/algorithm/SlidingWindow.html" class="leancloud_visitors">
    <i class="shni shn-eye-fill" />
    <i class="leancloud-visitors-count"></i>
</span>
</p>

### 原理

本质上滑动窗口都是在数组上进行操作，对数组的操作我们一般会采用循环类方法，而滑动窗口方法则为了提升效率会采用进阶的循环，即两个指针：左指针<code class="default">left</code>，右指针<code class="default">right</code>。

两个指针之间的内容：<code class="default">[left...right]</code>则构成了窗口<code class="default">window</code>，随着指针的不断移动，窗口的位置和大小都会发生变动，但窗口里面的数据始终是连续的，通过对这些数据的处理，就可以得到需要的结果。

#### 41

##### 411

#### 42

##### 51

##### 52
###### 61

### leetcode简单题

#### [3.无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

给定一个字符串 <code class="default">s</code> ，请你找出其中不含有重复字符的 <b>最长子串</b> 的长度。

<b>示例1：</b>
<blockquote class="small">
输入：s = "abcabcbb"<br>
输出：3<br>
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：s = "pwwkew"<br>
输出：3<br>
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。<br>
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：bbbbb<br>
输出：1<br>
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
</blockquote>

```js
var lengthOfLongestSubstring = function(s) {
    let max = 0
    let n = s.length

    // 定义左右两个指针
    let l = 0;
    let r = 0;

    let set = new Set()

    // 当左右指针 也就是窗口还在字符串内则继续循环
    while (l < n && r < n) {
        if(set.has(s[r])){
            // 当发现set内有重复值，则删除左指针的值，并向右移步
            set.delete(s[l++])
        }else{
            // 当发现set内没有重复值，则add右指针的值，并向右移步
            set.add(s[r++])
            max = Math.max(max, r - l)
        }
    }

    return max
};
```

#### [219.存在重复元素 II111111111111111111111111111111111111111111存在重复元素 II111111111111111111111111111111111111111111](https://leetcode.cn/problems/contains-duplicate-ii/description/)

给你一个整数数组 <code class="default">nums</code> 和一个整数 <code class="default">k</code> ，判断数组中是否存在两个 不同的索引 <code class="default">i</code> 和 <code class="default">j</code> ，满足 <code class="default">nums[i] == nums[j]</code> 且 <code class="default">abs(i - j) <= k</code> 。如果存在，返回 <code class="default">true</code> ；否则，返回 <code class="default">false</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,2,3,1], k = 3<br>
输出：true
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [1,0,1,1], k = 1<br>
输出：true
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: nums = [1,2,3,1,2,3], k = 2<br>
输出：false
</blockquote>

```js
var containsNearbyDuplicate = function(nums, k) {
    let n = nums.length

    let set = new Set()

    for (let i = 0; i < n; i++) {
        if (i > k) {
            // 当i > k 的时候开始滑动
            // 删除滑动窗口的第一个元素
            set.delete(nums[i - k - 1])
        }
        if (set.has(nums[i])) {
            // 当发现有重复值，return true
            return true
        } else {
            // 没有重复值，继续下次滑动，也就是窗口右移一位
            set.add(nums[i])
        }
    }

    return false
};
```

#### [643.子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/description/)

给你一个由 <code class="default">n</code> 个元素组成的整数数组 <code class="default">nums</code> 和一个整数 <code class="default">k</code> 。

请你找出平均数最大且 长度为 <code class="default">k</code> 的连续子数组，并输出该最大平均数。

任何误差小于 <code class="default">10-5</code> 的答案都将被视为正确答案。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,12,-5,-6,50,3], k = 4<br>
输出：12.75<br>
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [5], k = 1<br>
输出：5.00000
</blockquote>

```js
var findMaxAverage = function (nums, k) {
    let n = nums.length
    let count = 0
    // 将首个窗口的和求出并且赋值给max
    for (let i = 0; i < k; i++) {
        count += nums[i]
    }
    let max = count


    for (let i = k; i < n; i++) {
        // 每次循环窗口都向右移动一位 = 减去第一个数字，再加上后一个数字
        count = count - nums[i - k] + nums[i]
        // 求最大值
        max = Math.max(max, count)
    }

    // 返回最大值的平均值
    return max / k
};
```

#### [1984.学生分数的最小差值](https://leetcode.cn/problems/minimum-difference-between-highest-and-lowest-of-k-scores/description/)

给你一个 下标从 <code class="default">0</code> 开始 的整数数组 <code class="default">nums</code> ，其中 <code class="default">nums[i]</code> 表示第 <code class="default">i</code> 名学生的分数。另给你一个整数 <code class="default">k</code> 。

从数组中选出任意 <code class="default">k</code> 名学生的分数，使这 <code class="default">k</code> 个分数间 <b>最高分</b> 和 <b>最低分</b> 的 <b>差值</b> 达到 <b>最小化</b> 。

返回可能的 <b>最小差值</b> 。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [90], k = 1<br>
输出：0<br>
解释：选出 1 名学生的分数，仅有 1 种方法：<br>
[90] 最高分和最低分之间的差值是 90 - 90 = 0<br>
可能的最小差值是 0<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [9,4,1,7], k = 2<br>
输出：2<br>
解释：选出 2 名学生的分数，有 6 种方法：<br>
[9,4,1,7] 最高分和最低分之间的差值是 9 - 4 = 5<br>
[9,4,1,7] 最高分和最低分之间的差值是 9 - 1 = 8<br>
[9,4,1,7] 最高分和最低分之间的差值是 9 - 7 = 2<br>
[9,4,1,7] 最高分和最低分之间的差值是 4 - 1 = 3<br>
[9,4,1,7] 最高分和最低分之间的差值是 7 - 4 = 3<br>
[9,4,1,7] 最高分和最低分之间的差值是 7 - 1 = 6<br>
可能的最小差值是 2<br>
</blockquote>

```js
var findMaxAverage = function (nums, k) {
    nums.sort((a, b) => {
        return a - b
    })
    
    let n = nums.length
    let min = Infinity

    // 数组排序后利用滑动窗口，每次滑动窗口得出差值，然后求最小值
    for (let i = 0; i < n - k + 1; i++) {
        min = Math.min(min, nums[i + k - 1] - nums[i])
    }

    return min
};
```

### leetcode中等题
#### [209.长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

给定一个含有 <code class="default">n</code> 个正整数的数组和一个正整数 <code class="default">target</code> 。

找出该数组中满足其和 <code class="default">≥ target</code> 的长度最小的 连续子数组 <code class="default">[numsl, numsl+1, ..., numsr-1, numsr]</code> ，并返回其长度。如果不存在符合条件的子数组，返回 <code class="default">0</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：target = 7, nums = [2,3,1,2,4,3]<br>
输出：2<br>
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: target = 4, nums = [1,4,4]<br>
输出：1<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: target = 11, nums = [1,1,1,1,1,1,1,1]<br>
输出：0<br>
</blockquote>


```js
var minSubArrayLen = function(target, nums) {
    // 如果数组内包含target那么直接返回1即可
    if (nums.includes(target)) return 1

    let n = nums.length

    let l = 0
    let r = 0

    let len = Infinity
    let sum = 0

    while (r <= n) {
        sum += nums[r]
        while (sum >= target) {
            len = Math.min(len, r - l + 1);
            sum -= nums[l];
            l++
        }
        r++
    }

    return len == Infinity ? 0 : len
};

// 题解 https://leetcode.cn/problems/minimum-size-subarray-sum/solutions/305704/chang-du-zui-xiao-de-zi-shu-zu-by-leetcode-solutio/
```
